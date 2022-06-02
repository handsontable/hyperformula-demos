# usage:
# > sh set-hyperformula-version.sh 1.2.3
find . -maxdepth 2 -name package.json -print0 | xargs -0 sed -i'' 's/"hyperformula": "[^"]*"/"hyperformula": "'$1'"/g'
