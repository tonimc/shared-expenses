<template>
  <div class="person">
    <img :src="person.picture" class="picture" />
    <h4>{{ fullName }}</h4>
    <h4>{{ person.amount }} &#8364;</h4>
    <h4 :class="debtClass">{{ debtAction }} {{ Math.abs(debt) }} &#8364;</h4>
  </div>
</template>

<script>
export default {
  name: 'PersonData',
  props: {
    person: {
      type: Object,
      default: null
    },
    amount: {
      type: Number,
      default: 0
    }
  },
  computed: {
    fullName() {
      return `${this.person.name.first} ${this.person.name.last}`;
    },
    debt() {
      return this.amount - this.person.amount;
    },
    debtAction() {
      return this.debt > 0 ? 'Pay' : this.debt < 0 ? 'Receive' : 0;
    },
    debtClass() {
      return {
        Pay: 'debtClass--red',
        Receive: 'debtClass--green',
        '': 'debtClass--blue'
      }[this.debtAction];
    }
  }
};
</script>

<style lang="scss" scoped>
.person {
  display: flex;
  padding: 1rem;

  & > h4 {
    width: 30%;
    padding-left: 1rem;
  }

  .picture {
    border-radius: 50%;
  }
}
.debtClass--green {
  color: green;
}
.debtClass--red {
  color: red;
}
.debtClass--blue {
  color: blue;
}
</style>
