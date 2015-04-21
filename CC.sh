#Crear and Copy -- Initialize folders to test
>log.log
echo "log.log clean"
rm -r -f /home/luisgil/Music/AML/box/*
echo "AML box clean"
rm -r -f /home/luisgil/Music/AML/collection/*
echo "AML collection clean"
cp -r /home/luisgil/Music/tracks/ /home/luisgil/Music/AML/box/
echo "test files copied to AML Box"
echo "exec jasmine"
jasmine
echo "opening log"
bunyan log.log
