echo -e "\t\t\n\n \033[1;33mNest Module Creator\033[0m"
echo "\033[1;32mEnter the title\033[0m"
read title

nest g mo $title
nest g co $title
nest g s $title

echo "\033[1;31mDone!\033[0m"
