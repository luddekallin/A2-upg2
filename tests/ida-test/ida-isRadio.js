//maxContainer i filter.js
function isRadio(event) {
  return event.target.type === "radio";
}

//onSiteCheckBox i filter.js
function isChecked(event) {
  return Boolean(event?.target?.checked);
}

module.exports = { isRadio, isChecked };
