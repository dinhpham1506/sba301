import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../models/app_user.dart';

class HomeScreen extends ConsumerWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // TODO: watch userViewModelProvider
    // - loading -> CircularProgressIndicator
    // - error -> hien thi loi
    // - data rong -> empty state
    // - data -> Responsive: phone doc 1 cot, ngang/tablet 2 cot
    //   moi item la UserCard: onTap -> UserDetailScreen, onDelete -> confirm dialog
    // FloatingActionButton -> mo form Add (showModalBottomSheet / dialog)
    throw UnimplementedError();
  }
}

class UserFormSheet extends ConsumerStatefulWidget {
  const UserFormSheet({super.key, this.user});

  final AppUser? user;

  @override
  ConsumerState<UserFormSheet> createState() => _UserFormSheetState();
}

class _UserFormSheetState extends ConsumerState<UserFormSheet> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  String? _selectedAvatar;

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // TODO: Form voi Name, Email, Avatar catalog
    // Validate: Name khong rong, Email dung dinh dang, Avatar da chon
    // Submit -> add hoac update -> Navigator.pop
    throw UnimplementedError();
  }
}
