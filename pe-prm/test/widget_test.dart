import 'package:flutter_test/flutter_test.dart';

import 'package:pe_prm/pe_exam/models/app_user.dart';

void main() {
  test('AppUser toMap/fromMap round trip', () {
    const user = AppUser(name: 'An', email: 'an@example.com', avatar: 'a1.png');
    final restored = AppUser.fromMap(user.toMap());

    expect(restored.name, 'An');
    expect(restored.email, 'an@example.com');
    expect(restored.avatar, 'a1.png');
    expect(restored.id, isNull);
  });
}
