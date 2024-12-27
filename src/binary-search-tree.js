const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */

class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);

    if (this.rootNode === null) {
      this.rootNode = newNode;
      return;
    }

    let currentNode = this.rootNode;

    while (currentNode) {
      if (data > currentNode.data) {
        if (currentNode.right === null) {
          currentNode.right = newNode;
          return;
        } else {
          currentNode = currentNode.right;
        }
      } else if (data < currentNode.data) {
        if (currentNode.left === null) {
          currentNode.left = newNode;
          return;
        } else {
          currentNode = currentNode.left;
        }
      } else if (data === currentNode.data) {
        return;
      }
    }
  }

  has(data) {
    if (this.rootNode === null) return false;
    let currentNode = this.rootNode;

    while (currentNode) {
      if (currentNode.data === data) {
        return true;
      } else if (currentNode.data > data) {
        currentNode = currentNode.left;
      } else if (currentNode.data < data) {
        currentNode = currentNode.right;
      }
    }
    return false;
  }

  find(data) {
    if (this.rootNode === null) return null;
    let currentNode = this.rootNode;

    while (currentNode) {
      if (currentNode.data === data) {
        return currentNode;
      } else if (currentNode.data > data) {
        currentNode = currentNode.left;
      } else if (currentNode.data < data) {
        currentNode = currentNode.right;
      }
    }
    return null;
  }

  remove(data) {
    this.rootNode = this._removeNode(data, this.rootNode);
  }

  _removeNode(data, node) {
    if (node === null) return null;

    if (data < node.data) {
      node.left = this._removeNode(data, node.left);
    } else if (data > node.data) {
      node.right = this._removeNode(data, node.right);
    } else if (data === node.data) {
      if (!node.left && !node.right) return null;
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      if (node.left && node.right) {
        const minNode = this._getMin(node.right);
        node.data = minNode.data;
        node.right = this._removeNode(minNode.data, node.right);
      }
    }
    return node;
  }

  _getMin(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  min() {
    if (this.rootNode === null) return;
    let currentNode = this.rootNode;

    while (currentNode.left !== null) {
      currentNode = currentNode.left;
    }
    return currentNode.data;
  }

  max() {
    if (this.rootNode === null) return;
    let currentNode = this.rootNode;

    while (currentNode.right !== null) {
      currentNode = currentNode.right;
    }
    return currentNode.data;
  }
}

module.exports = {
  BinarySearchTree
};

//  1
//      5
//    3   6
//  2
