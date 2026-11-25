class AppUser {
  final int? id;
  final String name;
  final String email;
  final String avatar;

  const AppUser({
    this.id,
    required this.name,
    required this.email,
    required this.avatar,
  });

  factory AppUser.fromMap(Map<String, Object?> map) {
    return AppUser(
      id: map['id'] as int?,
      name: map['name'] as String? ?? '',
      email: map['email'] as String? ?? '',
      avatar: map['avatar'] as String? ?? '',
    );
  }

  Map<String, Object?> toMap() {
    return <String, Object?>{
      if (id != null) 'id': id,
      'name': name,
      'email': email,
      'avatar': avatar,
    };
  }

  AppUser copyWith({
    int? id,
    String? name,
    String? email,
    String? avatar,
  }) {
    return AppUser(
      id: id ?? this.id,
      name: name ?? this.name,
      email: email ?? this.email,
      avatar: avatar ?? this.avatar,
    );
  }
}
