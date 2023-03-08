package ru.kata.spring.boot_security.bootstrap.util;

public class JsonResponse {
    private String msg;
    private boolean ok;

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public boolean isOk() {
        return ok;
    }

    public void setOk(boolean ok) {
        this.ok = ok;
    }
}
