#!/bin/bash

set -euo pipefail

filename=$1
convert $filename -rotate 90 $(basename $filename .png)-90.png
