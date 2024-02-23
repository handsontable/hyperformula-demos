# usage:
# > sh update-hyperformula-in-lock-files.sh

for d in ./*/ ; do (cd "$d" && npm update hyperformula); done
