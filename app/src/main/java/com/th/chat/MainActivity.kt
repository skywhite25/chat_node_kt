package com.th.chat

import android.content.Context
import android.content.Intent
import android.content.SharedPreferences
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.th.chat.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding // viewBinding

    internal lateinit var preferences: SharedPreferences // :: 로만 접근 가능 -> 초기화 먼저 안하면 오류

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMainBinding.inflate(layoutInflater) // viewBinding
        setContentView(binding.root)

        preferences = getSharedPreferences("USERSIGN", Context.MODE_PRIVATE)
        val editor = preferences!!.edit()

        // 버튼 클릭시 입력한 이름이 SharedPreference에 저장 -> 채팅방으로 이동
        binding.button.setOnClickListener{
            editor.putString("name", binding.editText.text.toString())
            val intent = Intent(this, ChatRoomActivity::class.java)
            startActivity(intent)
        }
    }
}