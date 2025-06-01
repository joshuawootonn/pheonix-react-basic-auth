defmodule TestElixirAuthWeb.Layouts do
  @moduledoc """
  This module holds different layouts used by your application.

  See the `layouts` directory for all templates available.
  The "root" layout is a skeleton rendered as part of the
  application router. The "app" layout is set as the default
  layout on both `use TestElixirAuthWeb, :controller` and
  `use TestElixirAuthWeb, :live_view`.
  """
  use TestElixirAuthWeb, :html

  embed_templates "layouts/*"
end
