#!/bin/zsh

cmd="yarn run typecheck" # replace with your typechecking/linting command

echo "running typecheck before push..."
eval $cmd
result=$?
if ! eval "$cmd"; then
echo "Failed typecheck! Fix before pushing or force push: \`git push --no-verify\`" >&2
exit 1
fi

exit 0