const HashMap=require('./HashMap.js');
HashMap.MAX_LOAD_RATIO=0.5;
HashMap.SIZE_RATIO=3;


function remDups(str){
  let newS='';
  const charCheck=new HashMap();
  for(let i=0;i<str.length;i++){
    try{
      charCheck.get(str.charAt(i));
      continue;
    }
    catch(e){
      charCheck.set(str.charAt(i),true);
      newS+=str.charAt(i);
    }
  }
  return newS;
}

function anyPermAPalindrome(str){
  const freqTable=new HashMap();
  for(let i=0;i<str.length;i++){
    try{
      const count=freqTable.get(str.charAt(i));
      freqTable.set(str.charAt(i),count+1);
    }
    catch(e){
      freqTable.set(str.charAt(i),1);
    }
  }
  let countOdds=0;
  freqTable._hashTable.forEach(keyValObj=>{
    if(keyValObj.value%2===1){
      countOdds++;
    }
  });
  if(countOdds>1){
    return false;
  }
  return true;
}

function groupAnagrams(arr){
  let finalAnswer=[];
  arr.forEach(str=>{
    const freqTable=new HashMap();
    for(let i=0;i<str.length;i++){
      try{
        const count=freqTable.get(str.charAt(i));
        freqTable.set(str.charAt(i),count+1);
      }
      catch(e){
        freqTable.set(str.charAt(i),1);
      }
    }

    let isAnagram=false;
    let i=0;
    for(i=0; i<finalAnswer.length;i++){
      const oneOfTheFreqTables=finalAnswer[i].freqTable;
      if(oneOfTheFreqTables.length!==freqTable.length)
        continue;

      let countSuccess=0;
      freqTable._hashTable.forEach(keyValObject=>{
        countSuccess++;
        try{
          let count=oneOfTheFreqTables.get(keyValObject.key);
          if(count!==keyValObject.value){
            throw new Error;
          }
        }
        catch(e){
          countSuccess--;
        }
      });
      isAnagram=(countSuccess===freqTable.length)?true:false;
      if(isAnagram)
        break;
    }
    if(!isAnagram){
      finalAnswer.push({
        freqTable:freqTable,
        anagrams:[str]
      });
    }
    else if(isAnagram){
      finalAnswer[i].anagrams.push(str);
    }
    //console.log(JSON.stringify(finalAnswer));
  });
  let actuallyFinal=[];
  finalAnswer.forEach(obj=>{
    actuallyFinal.push(obj.anagrams);
  });
  return actuallyFinal;

}

function main(){
  const lor=new HashMap();
  lor.set('Hobbit','Bilbo');
  lor.set('Hobbit','Frodo');
  lor.set('Wizard','Gandalf');
  lor.set('Human','Aragon');
  lor.set('Elf','Legolas');
  lor.set('Maiar','The Necromancer');
  lor.set('Maiar','Sauron');
  lor.set('RingBearer','Gollum');
  lor.set('LadyOfLight','Galadriel');
  lor.set('HalfElven','Arwen');
  lor.set('Ent','Treebeard');
  console.log(lor);
  console.log(lor.get('Maiar'));
  console.log(lor.get('Hobbit'));
  //capacity tripled when we try to set after setting the first 4 distinct keys (so that length is actually 4 and note that deleting won't decrease the loadsize ratio, so any legal operations in between is still fine), because then currentloadsize was above 50%.

  console.log(remDups('google'));
  console.log(anyPermAPalindrome('google'));
  console.log(anyPermAPalindrome('googl'));
  console.log(anyPermAPalindrome('hhhttsss'));
  console.log(anyPermAPalindrome('hhhttss'));
  console.log(JSON.stringify(groupAnagrams(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'])));
  console.log(JSON.stringify(groupAnagrams(['hey', 'yeah', 'yeh', 'wowzers', 'zowserw', 'eats', 'race'])));
}
main();


const WhatDoesThisDo = function(){
  let str1 = 'Hello World.';
  let str2 = 'Hello World.';
  let map1 = new HashMap();
  map1.set(str1,10);
  map1.set(str2,20);
  let map2 = new HashMap();
  let str3 = str1;
  let str4 = str2;
  map2.set(str3,20);
  map2.set(str4,10);

  console.log(map1.get(str1));
  console.log(map2.get(str3));
};
//WhatDoesThisDo();
//in map1, the key "Hello World." has the value 20, whatever the very last .set was. in map2 the last .set on the key "Hello World." has value 10, so 10

