
export const dva = {
    config: {
        onError(err: { preventDefault: () => void }) {
            console.log(err);
            err.preventDefault() // 阻止 error 的继续抛出？目前看是这样，不知是不是 dva 封装了 err 的方法
        },
    },
}

export default dva
