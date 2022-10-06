type LinkedNode<T> = {
  value: T,
  next: LinkedNode<T> | null;
}

export class NodeLinkedList<T> {
  private nodes: LinkedNode<T>[] = [];

  get size(): number {
    return this.nodes.length;
  }

  get head(): LinkedNode<T> | null {
    return this.size ? this.nodes[0] : null;
  }

  get tail(): LinkedNode<T> | null {
    return this.size ? this.nodes[this.size - 1] : null;
  }

  insertAt(index, value) {
    const previousNode = this.nodes[index - 1] || null;
    const nextNode = this.nodes[index] || null;
    const node = { value, next: nextNode };

    if (previousNode) {
      previousNode.next = node;
    }
    this.nodes.splice(index, 0, node);
  }

  unshift(value) {
    this.insertAt(0, value);
  }

  put(value) {
    this.insertAt(this.size, value);
  }

  at(index) {
    return this.nodes[index];
  }

  remove(index): LinkedNode<T>[] {
    const previousNode = this.nodes[index - 1];
    const nextNode = this.nodes[index + 1] || null;

    if (previousNode) {
      previousNode.next = nextNode;
    }

    return this.nodes.splice(index, 1);
  }

  clear() {
    this.nodes = [];
  }

  find(fn): T | null {
    let node = this.head;
    while (node) {
      if (node.value && fn(node.value)) {
        return node.value;
      }
      node = node.next;
    }
    return null;
  }

  * [Symbol.iterator]() {
    yield* this.nodes;
  }
}