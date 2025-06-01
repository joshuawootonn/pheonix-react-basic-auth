defmodule TestElixirAuth.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      TestElixirAuthWeb.Telemetry,
      TestElixirAuth.Repo,
      {DNSCluster, query: Application.get_env(:test_elixir_auth, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: TestElixirAuth.PubSub},
      # Start the Finch HTTP client for sending emails
      {Finch, name: TestElixirAuth.Finch},
      # Start a worker by calling: TestElixirAuth.Worker.start_link(arg)
      # {TestElixirAuth.Worker, arg},
      # Start to serve requests, typically the last entry
      TestElixirAuthWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: TestElixirAuth.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    TestElixirAuthWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
