#!/bin/sh
# =============================================================================
# DevContainer Post-Create Setup Script
# =============================================================================
# This script runs AFTER the container is created and all features (mise, etc.)
# are installed. It sets up the development environment by:
# 1. Installing mise-managed tools (Node, aube, Python, etc.)
# 2. Setting up Python environment and Jupyter kernel
# 3. Installing JavaScript dependencies with optimized aube configuration
# =============================================================================

# Exit immediately if any command fails
set -e
# Exit if any variable is undefined
set -u
# Set default umask for consistent file permissions
umask 022

log()  { printf '%s: %s\n' "$1" "$2" >&2; }  # LEVEL MESSAGE
info() { log INFO "$*"; }
err()  { log ERROR "$*"; }

# The mise feature should have installed mise by now. If it's not found,
# something went wrong with the feature installation.
command -v mise >/dev/null 2>&1 || { 
  err "mise command not found - feature may not have installed correctly"
  exit 127
}

# =============================================================================
# Section 1: Install mise-managed toolchain
# =============================================================================
# mise reads mise.toml to determine which tool versions to install.
# This ensures everyone on the team uses identical versions of:
# - Node.js (for Astro frontend)
# - aube (package manager)
# - Python (for Python scripts)
# - uv (fast Python package installer)
# - Deno (for the backend API in services/)
# =============================================================================

info "Trusting mise configuration..."
# mise won't automatically use config files from untrusted sources (security).
# This command explicitly trusts the mise.toml in this repo and any parent configs.
# The -y flag makes it non-interactive (safe for automated scripts).
# The -a flag trusts all configs (repo + system-level).
mise -y trust -a

info "Installing toolchain from mise.toml..."
# Downloads and installs all tools specified in mise.toml.
# This might take a few minutes on first run but is cached for rebuilds.
# Tools are installed to ~/.local/share/mise/ and shimmed for PATH access.
mise -y install

# =============================================================================
# Section 2: Python Environment Setup
# =============================================================================
# We need a Jupyter kernel that uses the mise-managed Python. This allows
# notebooks to use the correct Python version with all project dependencies.
# =============================================================================

# info "Installing Python packages..."
# Use mise exec to run commands with the correct Python version.
# mise exec <tool> -- <command> ensures we use the mise-managed version,
# not any system-installed version.

# Install ipykernel using uv (much faster than pip)
# --system: Install to the Python installation, not a virtual env
# --upgrade: Update if already installed
# mise exec uv -- uv pip install --system --upgrade ipykernel

# Register the kernel with Jupyter
# This creates ~/.local/share/jupyter/kernels/py-mise/kernel.json with an
# absolute path to the mise-managed Python binary.
# --sys-prefix: Install relative to the Python installation (not user-global)
# --name: Internal kernel identifier
# --display-name: What users see in Jupyter UI
# mise exec python -- python -m ipykernel install --sys-prefix \
#   --name py-mise --display-name "Python (mise)"

# info "Python environment setup complete (kernel: py-mise)"

# =============================================================================
# Section 3: JavaScript Dependencies Installation
# =============================================================================
# This is where the aube performance optimization happens!
#
# BACKGROUND:
# The onCreateCommand already configured aube to use store-dir=node_modules/.aube-store
# by writing to ~/.npmrc. This ensures the aube store is on the SAME filesystem
# as node_modules (both in the Docker volume), enabling fast hard links.
#
# PERFORMANCE COMPARISON:
# Without optimization (store on different filesystem):
# - First install: ~30s (downloads)
# - Rebuild: ~30s (copies everything again)
# - Terminal `aube install`: ~28s (copies everything again)
#
# With optimization (store in node_modules volume):
# - First install: ~30s (downloads)
# - Rebuild: ~2-3s (hard links from persisted store)
# - Terminal `aube install`: ~2-3s (hard links from persisted store)
#
# WHY THE CHECK?
# We only run aube install if:
# 1. node_modules doesn't have a .aube-state/lockfile (never installed), OR
# 2. The lockfile changed since last install
#
# This saves time on container rebuilds when dependencies haven't changed.
# =============================================================================

if [ ! -f "node_modules/.aube-state/lockfile" ] || ! cmp -s "aube-lock.yaml" "node_modules/.aube-state/lockfile"; then
  info "Installing JavaScript dependencies..."
  info "  Store location: node_modules/.aube-store (configured via ~/.npmrc)"
  info "  This enables fast hard-link installs instead of copying files"
  
  # Run aube install using the mise-managed aube version.
  mise exec aube -- aube install
  
  info "JavaScript dependencies installed"
  info "  Subsequent 'aube install' commands will use hard links (~2-3s)"
else
  info "JavaScript dependencies up to date (lockfiles match)"
  info "  Skipping aube install to save time"
fi

info "Post-create setup complete!"
info ""
info "Next steps:"
info "  - Start PostgreSQL"
info "  - Start the backend API from services/"
info "  - Start frontend: aube dev"
info ""
info "Performance tip:"
info "  Running 'aube install' in a terminal should now take ~2-3 seconds"
info "  instead of ~30 seconds thanks to hard-link optimization!"