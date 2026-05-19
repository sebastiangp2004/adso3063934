"use client";

import Swal from "sweetalert2";

const toast = Swal.mixin({
    toast: true,
    icon: "success",
    position: "top-end",
    showConfirmButton: false,
    timer: 1800,
    timerProgressBar: true,
    background: "#0f172a",
    color: "#f8fafc",
});

export const successAlert = (message: string) => {
    return toast.fire({
        title: message,
        icon: "success",
    });
};

export const errorAlert = (message: string) => {
    return Swal.fire({
        icon: "error",
        title: message,
        position: "top-end",
        showConfirmButton: false,
        timer: 2200,
        timerProgressBar: true,
        background: "#0f172a",
        color: "#f8fafc",
    });
};
