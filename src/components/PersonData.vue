<template>
  <div v-if="person" class="person">
    <img :src="person.picture" class="picture" />
    <h4>{{ fullName }}</h4>
    <h4>
      <span v-if="!editable">{{ person.amount.toFixed(2) }} &#8364;</span>
      <input v-else v-model="budget" type="number" />
    </h4>
    <h4 :class="debtClass">{{ debtAction }} {{ Math.abs(debt) }} &#8364;</h4>
    <img
      v-if="!editable"
      src="../assets/edit.svg"
      class="icon"
      @click="editable = true"
    />
    <img
      v-if="editable"
      src="../assets/save.svg"
      class="icon"
      @click="savePerson"
    />
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
  data() {
    return {
      editable: false
    };
  },
  computed: {
    fullName() {
      return `${this.person.name.first} ${this.person.name.last}`;
    },
    debt() {
      return (this.amount - this.person.amount).toFixed(2);
    },
    debtAction() {
      return this.debt > 0 ? 'Pay' : this.debt < 0 ? 'Receive' : '';
    },
    debtClass() {
      return {
        Pay: 'debtClass--red',
        Receive: 'debtClass--green',
        '': 'debtClass--blue'
      }[this.debtAction];
    },
    budget: {
      get() {
        return this.person.amount;
      },
      set(amount) {
        const person = {
          ...this.person,
          amount: Number(amount)
        };
        this.$emit('person-updated', person);
      }
    }
  },
  methods: {
    savePerson() {
      this.editable = false;
      const person = { ...this.person };
      this.$emit('person-saved', person);
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
    height: 50px;
  }

  input {
    max-width: 100px;
  }

  .icon {
    width: 24px;
    &:hover {
      cursor: pointer;
    }
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
