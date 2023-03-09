package ru.kata.spring.boot_security.bootstrap.util;

public class DeleteResponse {
    private String msg;

    public DeleteResponse(String msg) {
        this.msg = msg;
    }


    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

}
