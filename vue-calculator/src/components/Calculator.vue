<template>
  <div class="calculator">
    <div class="display">{{ current || '0' }}</div>
    <div @click="clear" class="btn">C</div>
    <div @click="sign" class="btn">+/-</div>
    <div @click="percentage" class="btn">%</div>
    <div @click="makeOperation('division')"
      class="btn operator"
      v-bind:class="{clicked: operatorClicked}">/</div>
    <div @click="append('7')" class="btn">7</div>
    <div @click="append('8')" class="btn">8</div>
    <div @click="append('9')" class="btn">9</div>
    <div @click="makeOperation('multiply')"
      class="btn operator"
      v-bind:class="{clicked: operatorClicked}">X</div>
    <div @click="append('4')" class="btn">4</div>
    <div @click="append('5')" class="btn">5</div>
    <div @click="append('6')" class="btn">6</div>
    <div @click="makeOperation('minus')"
      class="btn operator"
      v-bind:class="{clicked: operatorClicked}">-</div>
    <div @click="append('1')" class="btn">1</div>
    <div @click="append('2')" class="btn">2</div>
    <div @click="append('3')" class="btn">3</div>
    <div @click="makeOperation('plus')"
      class="btn operator"
      v-bind:class="{clicked: operatorClicked}">+</div>
    <div @click="append('0')" class="btn zero">0</div>
    <div @click="dot" class="btn">.</div>
    <div @click="equal" class="btn operator">=</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      previous: null,
      current: '',
      operator: null,
      operatorClicked: false
    }
  },
  methods: {
    append(number) {
      if (this.operatorClicked) {
        this.current = '';
        this.operatorClicked = false;
      }
      this.current = `${this.current}${number}`;
    },
    clear() {
      this.current = '';
    },
    sign() {
      this.current = this.current.charAt(0) === '-' ?
        this.current.slice(1) : `-${this.current}`;
    },
    dot() {
      if (this.current.indexOf('.') === -1) {
        this.append('.');
      }
    },
    /**
     * This function stores the previous value and set
     * the operatorClicked as true in order to avoid
     * the append function
     */
    setPrevious() {
      if(this.previous !== null) {
        this.equal();
      }
      this.previous = this.current;
      this.operatorClicked = true;
    },
    /**
     * This function handles all the operations
     */
    makeOperation(operation) {
      switch (operation) {
        case 'division':
          this.operator = (a, b) => a / b;
          this.setPrevious();
          break;

        case 'multiply':
          this.operator = (a, b) => a * b;
          this.setPrevious();
          break;

        case 'minus':
          this.operator = (a, b) => a - b;
          this.setPrevious();
          break;

        case 'plus':
          this.operator = (a, b) => a + b;
          this.setPrevious();
          break;
      
        default:
          break;
      }
    },
    percentage() {
      this.current = `${parseFloat(this.current) / 100}`;
    },
    equal() {
      this.current = `${this.operator(
        parseFloat(this.previous),
        parseFloat(this.current)
      )}`;
      this.previous = null;
    }
  }
}
</script>


<style scoped>
.calculator {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(50px, auto);
  width: 400px;
  margin: 0 auto;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  text-align: center;
  font-size: 30px;
  cursor: pointer;
}

.display {
  grid-column: 1 / 5;
  color: #fff;
  background-color: #333;
  cursor: auto;
}

.btn {
  background-color: #eee;
  border: 1px solid rgba(0, 0, 0, .2);
}

.operator { background-color: orange; }

.clicked { background-color: #f9c15b; }

.zero {
  grid-column: 1 / 3;
}
</style>
