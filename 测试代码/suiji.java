import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.Set;

public class suiji{

    public static void main(String[] args){
        Map<String,Integer> bannermap=new HashMap<>();
        setMapRatio("bd-1|tt-1|gdt-1",bannermap);
        int b=0;
        int t=0;
        for (int i = 0; i <100 ; i++) {
            String s=getRandStrFromMap(bannermap);
            if(s=="bd"){
                b=b+1;
            }else if(s=="tt"){
                t=t+1;
            }
            System.out.println("result"+i+"--"+s);
        }
        System.out.println("result"+b+","+t);
    }

    public static void  setMapRatio(String bannerRatios,Map map){

        String[] advicetypes =    bannerRatios.split("\\|");
        for (int i = 0; i <advicetypes.length ; i++) {
            String[] adstate=   advicetypes[i].split("-");
            if(adstate.length==2){
                map.put(adstate[0].trim(),Integer.parseInt(adstate[1]));

            }
        }

    }


    private static String getRandStrFromMap(Map<String,Integer> integerMap){
        int sum=sumMapValue(integerMap);
    
        Set<String> keysets=integerMap.keySet();
        if(keysets.size()>1){
            int r=new Random().nextInt(sum);
            int i=0;
            for(String s:keysets){
                int a=integerMap.get(s);
                i=i+a;
       
                if(r<i){
                    return s;
                }
            }
        }else if(keysets.size()==1){
            return   keysets.iterator().next();
        }
        return "bd";

    }

    private static int sumMapValue(Map<String, Integer> map) {
        int i=0;
        for(Integer s:map.values()){
            i=i+s;
        }
        return i;
    }

}
