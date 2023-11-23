#!/usr/bin/env sh

set -e

npm run build

cd docs/.vitepress/dist

git init -b main
git add -A
git commit -m 'deploy'

git push -f git@github.com:strveJs/strve-doc.git main:pages

cd -