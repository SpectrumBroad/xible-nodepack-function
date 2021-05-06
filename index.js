'use strict';

module.exports = (NODE) => {
  const inputsIn = NODE.getInputByName('inputs');

  const variablesIn = NODE.getInputByName('variables');

  const triggerOut = NODE.getOutputByName('trigger');

  const triggerIn = NODE.getInputByName('trigger');
  triggerIn.on('trigger', async (conn, state) => {
    const inputs = await inputsIn.getValues(state);
    const variables = await variablesIn.getValues(state);

    let values;
    const fn = eval(`(function(inputs, variables, trigger, state){${NODE.data.function}})`);
    fn(
      inputs,
      variables.reduce((acc, cur) => {
        acc[cur.name] = cur.values; return acc;
      }, {}),
      () => {
        state.set(NODE, {
          values
        });
        triggerOut.trigger(state);
      }
    );
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
