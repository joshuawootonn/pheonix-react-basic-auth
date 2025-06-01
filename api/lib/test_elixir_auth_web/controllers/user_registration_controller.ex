defmodule TestElixirAuthWeb.UserRegistrationController do
  use TestElixirAuthWeb, :controller

  alias TestElixirAuth.Accounts
  alias TestElixirAuth.Accounts.User
  alias TestElixirAuthWeb.UserAuth

  def create(conn, %{"user" => user_params}) do
    case Accounts.register_user(user_params) do
      {:ok, user} ->
        {:ok, _} =
          Accounts.deliver_user_confirmation_instructions(
            user,
            fn token -> "http://localhost:3000/users/confirm/#{token}" end
          )

        conn
        |> UserAuth.log_in_user(user)
        |> json(%{
          status: "success",
          message: "User created successfully.",
          user: %{
            email: user.email
          }
        })

      {:error, %Ecto.Changeset{} = changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> json(%{
          status: "error",
          message: "Registration failed",
          errors: translate_changeset_errors(changeset)
        })
    end
  end

  defp translate_changeset_errors(changeset) do
    Ecto.Changeset.traverse_errors(changeset, fn {msg, opts} ->
      Enum.reduce(opts, msg, fn {key, value}, acc ->
        String.replace(acc, "%{#{key}}", to_string(value))
      end)
    end)
  end
end
