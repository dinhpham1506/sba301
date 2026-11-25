import './App.css'

function App() {
    
return (
<>
<Container className="mt-5">
<Alert variant="success">
🎉 Chúc mừng! Bạn đã tích hợp thành công Bootstrap vào React.
</Alert>
<Alert variant="success">Đây là thông báo thành công!</Alert>
<Alert variant="danger">Đã có lỗi xảy ra, vui lòng thử lại.</Alert>
<Alert variant="warning">Cảnh báo: Pin yếu!</Alert>
<Alert variant="info">Thông tin: Hệ thống sẽ bảo trì vào 12h đêm.</Alert>
<Button variant="primary" onClick={() => setCount((count) => count +
1)}>Click thử xem!</Button>
<Dropdown>
<Dropdown.Toggle variant="success" id="dropdown-basic">
Chọn hành động
</Dropdown.Toggle>
<Dropdown.Menu>
<Dropdown.Item href="#/action-1">Chỉnh sửa</Dropdown.Item>
<Dropdown.Item href="#/action-2">Cài đặt</Dropdown.Item>
<Dropdown.Divider />
<Dropdown.Item href="#/action-3" className="text-danger">
Xóa tài khoản
</Dropdown.Item>
</Dropdown.Menu>
</Dropdown>
</Container>
</>
)
}
export default App