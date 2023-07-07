# labassignment2

Hello, 
welcome here bruh,

To run the code successfully do the following things


1. clone the repo
2. npm install
   after installing packages do this extra thing
  navigate to file ***build.gradle*** of the ***react-native-vision-camera*** package, which is typically located at ***node_modules/react-native-vision-camera/android*** directory of your project
Find the line where the kotlin-gradle-plugin is declared. It should look something like this:
```
classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
classpath "org.jetbrains.kotlin:kotlin-android-extensions:$kotlin_version"
```


Replace ***$kotlin_version*** with the required version, which is 1.6.20 or higher, like so:
```
classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:1.6.20"
classpath "org.jetbrains.kotlin:kotlin-android-extensions:1.6.20"
```

(note in case after everything it is not working try deleting node_modules and reinstalling packages through npm install )

4. make sure you have XAMPP start the xampp
5. get to the XAMPP directory and htdocs folder place the three files of php in it, the files are currently in the repo
6. get to phpmyadmin and create a new database of meter_reading
7. create a table of records with 4 columns
8. get to cmd now
9. do ipconfig
10. find your ip and place it in the links wherever fetch is used,
11. mainly there are two pages where fetch is being used,
AND those are ViewRecordsScreen, AddRecordScreen


💥 it should be working now 

 check db_connection.php file as well, there might be changes needed, if the code is not working yet
