defmodule TestElixirAuthWeb.Router do
  use TestElixirAuthWeb, :router

  import TestElixirAuthWeb.UserAuth

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, html: {TestElixirAuthWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug :fetch_current_user
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug :fetch_session
    plug :fetch_current_user
  end

  scope "/", TestElixirAuthWeb do
    pipe_through :browser

    get "/", PageController, :home
  end

  # Other scopes may use custom stacks.
  # scope "/api", TestElixirAuthWeb do
  #   pipe_through :api
  # end

  # Enable LiveDashboard and Swoosh mailbox preview in development
  if Application.compile_env(:test_elixir_auth, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through :browser

      live_dashboard "/dashboard", metrics: TestElixirAuthWeb.Telemetry
      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end

  ## Authentication routes
  scope "/", TestElixirAuthWeb do
    pipe_through [:api]
    post "/api/users/confirm/:token", UserConfirmationController, :update
    delete "/api/users/log_out", UserSessionController, :delete
  end

  scope "/", TestElixirAuthWeb do
    pipe_through [:api, :redirect_if_user_is_authenticated]

    post "/api/users/log_in", UserSessionController, :create
    post "/api/users/register", UserRegistrationController, :create
    post "/api/users/reset_password", UserResetPasswordController, :create
    put "/api/users/reset_password/:token", UserResetPasswordController, :update
  end

  scope "/", TestElixirAuthWeb do
    pipe_through [:api, :require_authenticated_user]

    get "/api/users/me", UserSessionController, :read
  end


end
