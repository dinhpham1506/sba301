package fu.sba301.pe01.config;

import fu.sba301.pe01.exception.PEFunctionalException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationErrors(MethodArgumentNotValidException ex) {
        List<String> errors = ex.getBindingResult().getFieldErrors().stream()
                .map(fe -> fe.getField() + ": " + fe.getDefaultMessage())
                .toList();
        return ResponseEntity.badRequest().body(buildBody(HttpStatus.BAD_REQUEST, "Validation failed", errors));
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleNotFound(EntityNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(buildBody(HttpStatus.NOT_FOUND, ex.getMessage(), null));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> handleIllegalArgument(IllegalArgumentException ex) {
        return ResponseEntity.badRequest()
                .body(buildBody(HttpStatus.BAD_REQUEST, ex.getMessage(), null));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGeneral(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(buildBody(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), null));
    }
    @ExceptionHandler(PEFunctionalException.class)
    public ResponseEntity<Map<String, Object>> handlePEFunctionalException(PEFunctionalException ex) {
        if (ex.getErrorCode() == PEFunctionalException.EMPLOYEE_EMAIL_ALREADY_EXISTS) {
            return ResponseEntity.badRequest()
                    .body(buildBody(HttpStatus.IM_USED, ex.getErrorMessage(), null));
        } else if (ex.getErrorCode() == PEFunctionalException.EMPLOYEE_NAME_ALREADY_EXISTS) {
            return ResponseEntity.badRequest()
                    .body(buildBody(HttpStatus.CONFLICT, ex.getErrorMessage(), null));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(buildBody(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), null));
        }
    }
    private Map<String, Object> buildBody(HttpStatus status, String message, List<String> errors) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", status.value());
        body.put("error", status.getReasonPhrase());
        body.put("message", message);
        if (errors != null) body.put("errors", errors);
        return body;
    }
}
