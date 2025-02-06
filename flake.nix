{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    ags.url = "github:aylur/ags";
  };

  outputs = { self, nixpkgs, ags }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
      extraPackages = [
        ags.packages.${system}.battery
        ags.packages.${system}.tray
        ags.packages.${system}.hyprland
        ags.packages.${system}.wireplumber
      ];
    in
    {
      packages.${system}.default = ags.lib.bundle {
        inherit pkgs;
        src = ./.;
        name = "ags-bar"; # name of executable
        entry = "app.ts";
        gtk4 = false;

        # additional libraries and executables to add to gjs' runtime
        extraPackages = extraPackages;

        version = "1.0.0";
      };

      devShells.${system}.default = pkgs.mkShell {
        buildInputs = [
          (ags.packages.${system}.default.override {
            extraPackages = extraPackages;
          })
        ];
      };
    };
}
