defmodule TestElixirAuth.Repo do
  use Ecto.Repo,
    otp_app: :test_elixir_auth,
    adapter: Ecto.Adapters.Postgres
end
