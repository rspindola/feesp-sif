module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-vue',
    'stylelint-config-prettier',
  ],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'function-calc-no-invalid': null,
    'at-rule-no-unknown': null,
    'font-family-no-missing-generic-family-keyword': null,
    'selector-pseudo-element-colon-notation': null,
    'color-hex-length': null,
    'length-zero-no-unit': null,
    'comment-empty-line-before': null,
    'declaration-empty-line-before': null,
    'no-descending-specificity': null,
    'no-duplicate-selectors': null,
    'block-no-empty': null,
    'selector-type-no-unknown': [
      true,
      {
        ignore: ['custom-elements'],
      },
    ],
  },
}
