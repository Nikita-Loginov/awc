export function classAction(el, nameClass, action) {
  if (action === "add") {
    el.classList.add(nameClass);
  } else if (action === "remove") {
    el.classList.remove(nameClass);
  } else if (action === "toggle") {
    el.classList.toggle(nameClass);
  }
}
