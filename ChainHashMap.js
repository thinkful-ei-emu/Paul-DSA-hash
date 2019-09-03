class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }

  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    }
    else {
      let tempNode = this.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, null);
    }
  }
  find(key) {
    // Start at the head
    let currNode = this.head;
    // If the list is empty
    if (!this.head) {
      return null;
    }
    // Check for the item 
    while (currNode.value.key !== key) {
      /* Return null if it's the end of the list 
         and the item is not on the list */
      if (currNode.next === null) {
        return null;
      }
      else {
        // Otherwise, keep looking 
        currNode = currNode.next;
      }
    }
    // Found it
    return currNode;
  }

  remove(key) {
    // If the list is empty
    if (!this.head) {
      return null;
    }
    // If the node to be removed is head, make the next node head
    if (this.head.value.key === key) {
      this.head = this.head.next;
      return;
    }
    // Start at the head
    let currNode = this.head;
    // Keep track of previous
    let previousNode = this.head;

    while ((currNode !== null) && (currNode.value.key !== key)) {
      // Save the previous node 
      previousNode = currNode;
      currNode = currNode.next;
    }
    if (currNode === null) {
      console.log('Item not found');
      return;
    }
    previousNode.next = currNode.next;
  }
}

class ChainHashMap {
  constructor(initialCapacity=8) {
    this.length = 0;
    this._hashTable = [];
    this._capacity = initialCapacity;
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
  get(key) {
    const index = this._findSlot(key);
    if (this._hashTable[index] === undefined) {
      throw new Error('Key error');
    }
    const nodeToFind=this._hashTable[index].find(key);
    if(nodeToFind===null)
      throw new Error('Key error'); 
    return nodeToFind.value.value;
  }
  set(key, value){
    const loadRatio = (this.length + 1) / this._capacity;
    if (loadRatio > ChainHashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * ChainHashMap.SIZE_RATIO);
    }
    //Find the slot where this key should be in
    const index = this._findSlot(key);

    if(!this._hashTable[index]){
      let list=new LinkedList();
      this._hashTable[index]=list;
    }
    let alreadyPresent=this._hashTable[index].find(key);
    if(alreadyPresent===null){
      this.length++;
      this._hashTable[index].insertLast({key,value});
    }
    else{
      alreadyPresent.value.value=value;
    }
  }
  
  delete(key) {
    const index = this._findSlot(key);
    let slot = this._hashTable[index];
    if (slot === undefined) {
      throw new Error('Key error');
    }

    slot.remove(key);
    this.length--;
  }

  _findSlot(key) {
    const hash = ChainHashMap._hashString(key);
    const start = hash % this._capacity;
    return start;
    /* for (let i=start; i<start + this._capacity; i++) {
      const index = i % this._capacity;
      const slot = this._hashTable[index];
      if (slot === undefined || (slot.key === key && !slot.DELETED)) {
        return index;
      }
    } */
  }
  _resize(size) {
    const oldSlots = this._hashTable;
    this._capacity = size;
    // Reset the length - it will get rebuilt as you add the items back
    this.length = 0;
    this._deleted = 0;
    this._hashTable = [];

    for (const list of oldSlots) {
      if (list !== undefined) {
        let node=list.head;
        while(node!==null){
          this.set(node.value.key,node.value.value);
          node=node.next;
        }
      }
    }
  }
}

module.exports= ChainHashMap;