import Swal from "sweetalert2";

export function getItemsCount(cartItems) {
  return cartItems.reduce((prev, curr) => curr.quantity + prev, 0);
}

export function getSubtotal(cartItems) {
  return cartItems.reduce(
    (prev, { product, quantity }) => prev + product.price * quantity,
    0
  );
}

export function Alert({ msg, time, icon }) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: time,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: icon,
    title: msg,
  });
}
