package fu.sba301.pe01.exception;

public class PEFunctionalException extends RuntimeException{
    public final static byte EMPLOYEE_EMAIL_ALREADY_EXISTS = 1;
    public final static byte EMPLOYEE_NAME_ALREADY_EXISTS = 2;
    private final byte errorCode;
    private final String errorMessage;

    public PEFunctionalException(byte errorCode, String errorMessage) {
        super(errorMessage);
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
    public byte getErrorCode() {
        return errorCode;
    }
    public String getErrorMessage() {
        return errorMessage;
    }
}
