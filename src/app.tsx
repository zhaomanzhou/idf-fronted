
export const dva = {
    config: {
        onError(e: any) {
            console.log(e);
            // message.error(e.getMessage)
            e.preventDefault()
        },
    },
};
