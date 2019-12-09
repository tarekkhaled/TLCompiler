function toggle_checkbox (e) {
    const which_checkbox = e.target.classList[1];
    const checkboxCircleParent = document.querySelector(`.inner-${which_checkbox}`);
    document.querySelectorAll('.inner').forEach(checkbox => checkbox.classList.remove('active'))
    checkboxCircleParent.classList.toggle('active');
    document.querySelectorAll('.file').forEach(button => {
        if (!button.classList.contains(`${which_checkbox}-file`)) {
            button.setAttribute('disabled' , true)
        } else {
            button.removeAttribute('disabled')
        }
    })
}


module.exports = toggle_checkbox;