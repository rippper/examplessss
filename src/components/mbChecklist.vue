<template>
  <div class="mbChecklist" @change="$emit('change', currentValue)">
    <div class="checkList" v-for="(option,index) in options" :key="index"
         :class="{
            checklist_checked: isInArray(option.ThemeItemFlag),
            checklist_correct: isInArray(option.ThemeItemFlag) && correctOptions.includes(option.ThemeItemFlag)
          }">
      <label class="mint-checklist-label">
        <span class="mint-checkbox">
          <input
            class="mint-checkbox-input"
            type="checkbox"
            v-model="currentValue"
            :disabled="disabled || option.disabled"
            :value="option.ThemeItemFlag || option"/>
          <!--<span class="mint-checkbox-core"></span>-->
        </span>
        <!--&nbsp;&nbsp;{{option.ThemeItemFlag+'.'+option.ThemeItemTitle}}-->
        <span class="mint-checkbox-label" v-text="option.ThemeItemFlag+'.'"></span>
        <span class="mint-checkbox-label label_title" v-text="option.ThemeItemTitle"></span>
      </label>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { Checklist } from 'mint-ui'

  Vue.component(Checklist.name, Checklist)
  export default {
    data () {
      return {
        currentValue: this.value
      }
    },
    props: {
      options: {
        required: true
      },
      value: {
        type: [String, Number, Array]
      },
      disabled: {
        type: Boolean,
        default: false
      },
      correctOptions: {
        type: [Array, String]
      }
    },
    computed: {},
    methods: {
      isInArray (value) {
        for (var i = 0; i < this.currentValue.length; i++) {
          if (value === this.currentValue[i]) {
            return true
          }
        }
        return false
      }
    },
    watch: {
      value (val) {
        this.currentValue = val
      },
      currentValue (val) {
        this.$emit('input', val)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../style/mixin';

  .mbChecklist {
    .checkList {
      @extend %border-base;
      @include borderRadius(10px);
      background-color: $fill-grey;
      margin-bottom: toRem(30px);

      .checklist-input:focus {
        outline: none;
      }

      .mint-checklist-label {
        display: block;
        padding: toRem(21px) toRem(20px);
        font-size: 15px;
      }

      padding: 0 toRem(20px);
    }

    .checklist_checked {
      border: 1px solid $brand-primary;
      background-color: $fill-base;
      color: $brand-primary;

      &.checklist_correct {
        border: 1px solid $brand-success;
        color: $brand-success;
      }
    }

    .label_title {
      margin-left: toRem(50px);
    }
  }
</style>
