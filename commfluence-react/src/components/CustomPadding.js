export default class CustomPadding {
    constructor(quill, options) {
        this.quill = quill;
        this.options = options; // Initial options set here
        this.quill.on('editor-change', this.updatePadding.bind(this));
    }

    updatePadding(newOptions) {
        // Update this.options with new values
        this.options = newOptions;

        // Apply the new padding values
        const editor = this.quill.root;
        editor.style.paddingTop = this.options.top;
        editor.style.paddingRight = this.options.right;
        editor.style.paddingBottom = this.options.bottom;
        editor.style.paddingLeft = this.options.left;
    }
}
