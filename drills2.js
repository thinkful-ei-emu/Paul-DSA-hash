const ChainHashMap=require('./ChainHashMap.js');
ChainHashMap.MAX_LOAD_RATIO=0.5;
ChainHashMap.SIZE_RATIO=3;

function displayList(list) {
  let str = '';
  let tempNode = list.head;
  while (tempNode !== null) {
    str = str + tempNode.value.key + ': '+tempNode.value.value+', ';
    tempNode = tempNode.next;
  }
  if(!str){
    return;
  }
  console.log(str);
}

function main(){
  const lor=new ChainHashMap();
  lor.set('Hobbit','Bilbo');
  lor.set('Hobbit','Frodo');
  lor.set('Wizard','Gandalf');
  lor.set('HalfElven','Arwen');
  lor.set('Human','Aragon');
  lor.set('Elf','Legolas');
  lor.set('Maiar','The Necromancer');
  lor.set('Maiar','Sauron');
  lor.set('RingBearer','Gollum');
  lor.set('LadyOfLight','Galadriel');
  lor.set('Ent','Treebeard');
  console.log(lor);
  console.log(lor._hashTable.forEach(list=>displayList(list)));
  lor.delete('Ent');
  console.log(lor);
  console.log(lor._hashTable.forEach(list=>displayList(list)));
  lor.delete('Wizard');
  console.log(lor);
  console.log(lor._hashTable.forEach(list=>displayList(list)));
}
main();
