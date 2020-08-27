const triggerPrompt = (msg: string) => {
    return window.confirm(msg ? msg : 'Are you sure you want to do this?');
};


export {
    triggerPrompt,
};
