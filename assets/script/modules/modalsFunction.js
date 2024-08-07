export const modal = {
    background: {
        show: () => document.getElementById("modals-wrapper").classList.add("show"),
        hide: () => document.getElementById("modals-wrapper").classList.remove("show"),
    },
    changePassword: {
        show: () =>
            document.getElementById("modal-change-pass").classList.add("show") ||
            modal.background.show(),
        hide: () =>
            document.getElementById("modal-change-pass").classList.remove("show") ||
            modal.background.hide(),
    },
    savePass: {
        show: () =>
            document.getElementById("save-pass-modal").classList.add("show") ||
            modal.background.show(),
        hide: () =>
            document.getElementById("save-pass-modal").classList.remove("show") ||
            modal.background.hide(),
    },
    action: {
        show: () =>
            document.getElementById("modal-actions-pass").classList.add("show") ||
            modal.background.show(),
        hide: () =>
            document.getElementById("modal-actions-pass").classList.remove("show") ||
            modal.background.hide(),
    },
};
