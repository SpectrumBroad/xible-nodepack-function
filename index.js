'use strict';

module.exports = (NODE) => {
  const inputsIn = NODE.getInputByName('inputs');
  const triggerOut = NODE.getOutputByName('trigger');

  const triggerIn = NODE.getInputByName('trigger');
  triggerIn.on('trigger', async (conn, state) => {
    const inputs = await inputsIn.getValues(state);
    let values;
    const fn = eval(`(function(inputs, trigger, state){${NODE.data.function}})`);
    fn(inputs, () => {
      state.set(NODE, {
        values
      });
      triggerOut.trigger(state);
    });
  });

  const valuesOut = NODE.getOutputByName('values');
  valuesOut.on('trigger', async (conn, state) => {
    const thisState = state.get(NODE);
    if (!thisState || !thisState.values) {
      return;
    }

    return thisState.values;
  });
};
