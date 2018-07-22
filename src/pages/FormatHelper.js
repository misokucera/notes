class FormatHelper {
    static formatDateTime(timestamp) {
        let localeDate = '';

        if (timestamp) {
            const date = new Date(timestamp);
            localeDate = date.toLocaleString();
        }

        return localeDate;
    }
}

export default FormatHelper;
