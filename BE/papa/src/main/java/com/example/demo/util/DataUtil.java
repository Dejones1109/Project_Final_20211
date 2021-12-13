package com.example.demo.util;




public class DataUtil {
    public static String getNewId(String character,Integer numberOld){
       int numberNew = numberOld +1;
       if(character!=null && character.length()<3){
           System.out.println(concatString(character,numberNew));
               return concatString(character,numberNew);
       }

      return null;
    }
    private static String concatString(String character,Integer numberNew ){
        String formatString = String.valueOf(numberNew);
        String newId = "";
        if(character.toUpperCase().length()==1){
            switch (formatString.length()){
                case 1: newId = character.toUpperCase()+"000"+formatString;
                case 2 : newId = character.toUpperCase()+"00"+formatString;
                case 3 : newId = character.toUpperCase()+formatString;

            }
            System.out.println("newId"+newId);
            return newId;
        }else {
            switch (formatString.length()){
                case 1: newId = character.toUpperCase()+"00"+formatString;
                case 2:newId = character.toUpperCase()+formatString;
            }
            System.out.println("newId"+newId);
            return newId;
        }

    }

}
