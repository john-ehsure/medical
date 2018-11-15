<template>
    <span
        tabindex="0"
        :class="wrapClasses"
        @click="toggle"
        @keydown.space="toggle"
    >
        <input type="hidden" :name="name" :value="currentValue">
        <span :class="innerClasses">
            <slot name="open" v-if="currentValue === trueValue"></slot>
            <slot name="close" v-if="currentValue === falseValue"></slot>
        </span>
    </span>
</template>
<style scoped>
/* @import './styles/index.less'; */
.ivu-switch-large {
    width: 56px;
}
.ivu-switch {
    display: inline-block;
    width: 44px;
    height: 22px;
    line-height: 20px;
    border-radius: 22px;
    vertical-align: middle;
    border: 1px solid #ccc;
    background-color: #ccc;
    position: relative;
    cursor: pointer;
    user-select: none;
    transition: all 0.2s ease-in-out;
}
.ivu-switch:before {
    content: '';
    display: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: transparent;
    position: absolute;
    left: 3px;
    top: 3px;
    z-index: 1;
    border: 1px solid #2d8cf0;
    border-color: transparent transparent transparent #2d8cf0;
    animation: switch-loading 1s linear;
    animation-iteration-count: infinite;
}
.ivu-switch:after {
    content: '';
    width: 18px;
    height: 18px;
    border-radius: 18px;
    background-color: #fff;
    position: absolute;
    left: 1px;
    top: 2px;
    cursor: pointer;
    transition: left 0.2s ease-in-out, width 0.2s ease-in-out;
}
.ivu-switch:focus:hover {
    box-shadow: none;
}
.ivu-switch-checked {
    border-color: #ff6555;
    background-color: #ff6555;
}
.ivu-switch-inner {
    color: #fff;
    font-size: 12px;
    position: absolute;
    left: 23px;
    margin-top:1px;
}
.ivu-switch-checked .ivu-switch-inner {
    left: 7px;
}
.ivu-switch-checked:after {
    left: 23px;
}
.ivu-switch-large.ivu-switch-checked:after {
    left: 35px;
}
.ivu-switch-large {
    width: 56px;
}
.ivu-switch-loading {
    opacity: .4;
}
.ivu-switch:before {
    content: '';
    display: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: transparent;
    position: absolute;
    left: 3px;
    top: 3px;
    z-index: 1;
    border: 1px solid #2d8cf0;
    border-color: transparent transparent transparent #2d8cf0;
    animation: switch-loading 1s linear;
    animation-iteration-count: infinite;
}
.ivu-switch-loading:before {
    display: block;
}
.ivu-switch-small {
    width: 28px;
    height: 16px;
    line-height: 14px;
}
.ivu-switch-small.ivu-switch-checked:after {
    left: 13px;
}
.ivu-switch-small:after {
    width: 12px;
    height: 12px;
}
.ivu-switch:focus {
    box-shadow: 0 0 0 2px rgba(45, 140, 240, 0.2);
    outline: 0;
}
.ivu-switch-disabled {
    cursor: not-allowed;
    background: #f3f3f3;
    border-color: #f3f3f3;
}

</style>
<script>
    import { oneOf } from './assist';
    import Emitter from './emitter';

    const prefixCls = 'ivu-switch';

    export default {
        name: 'iSwitch',
        mixins: [ Emitter ],
        props: {
            value: {
                type: [String, Number, Boolean],
                default: false
            },
            trueValue: {
                type: [String, Number, Boolean],
                default: true
            },
            falseValue: {
                type: [String, Number, Boolean],
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            size: {
                validator (value) {
                    return oneOf(value, ['large', 'small', 'default']);
                },
                default () {
                    return !this.$IVIEW || this.$IVIEW.size === '' ? 'default' : this.$IVIEW.size;
                }
            },
            name: {
                type: String
            },
            loading: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                currentValue: this.value
            };
        },
        computed: {
            wrapClasses () {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-checked`]: this.currentValue === this.trueValue,
                        [`${prefixCls}-disabled`]: this.disabled,
                        [`${prefixCls}-${this.size}`]: !!this.size,
                        [`${prefixCls}-loading`]: this.loading,
                    }
                ];
            },
            innerClasses () {
                return `${prefixCls}-inner`;
            }
        },
        methods: {
            toggle (event) {
                event.preventDefault();
                if (this.disabled || this.loading) {
                    return false;
                }

                const checked = this.currentValue === this.trueValue ? this.falseValue : this.trueValue;

                this.currentValue = checked;
                this.$emit('input', checked);
                this.$emit('on-change', checked);
                this.dispatch('FormItem', 'on-form-change', checked);
            }
        },
        watch: {
            value (val) {
                if (val !== this.trueValue && val !== this.falseValue) {
                    throw 'Value should be trueValue or falseValue.';
                }
                this.currentValue = val;
            }
        }
    };
</script>
