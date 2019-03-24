Here's the list of props you should pass to your icon instance:
- width: icon width;
- height: icon height;
- fill: icon color (available if 'Replace inline colors with props' was checked while exporting);
- secondaryfill: icon secondary color - it applies to Nucleo icons only (available if 'Replace inline colors with props' was checked while exporting);
- strokewidth: icon stroke width (available if 'Replace stroke-width values with props' was checked while exporting).


When using Nucleo outline icons, please make sure to use the following stroke-width values:
- 16px icons -> up to 1px stroke (16px outline icons do not support stroke changes)
- 24px, 32px icons -> up to 2px stroke
- 48px, 64px icons -> up to 4px stroke