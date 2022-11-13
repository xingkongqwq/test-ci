using System.Windows.Forms;

namespace MXAutoTyper
{
    public partial class Form2 : Form
    {
        private int KeyID;
        private bool HasCtrl;
        public Form2()
        {
            InitializeComponent();
        }
        private void textBox1_KeyDown(object sender, KeyEventArgs e)
        {
            if (!KeyTools.IsKeyLegal(e.KeyValue))
            {
                MessageBox.Show("键不可用或被保留！","错误",MessageBoxButtons.OK,MessageBoxIcon.Error);
                textBox1.Text = "";
                return;
            }
            if (e.Control)
            {
                HasCtrl = true;
                if (KeyID == (int)Keys.ControlKey)
                {
                    KeyID = e.KeyValue;
                    textBox1.Text = "Ctrl";
                    return;
                }
                KeyID = e.KeyValue;
                textBox1.Text = "Ctrl + " + KeyTools.KeyCodeToKeyName(e.KeyValue);
                return;
            }
            HasCtrl = false;
            KeyID = e.KeyValue;
            textBox1.Text = KeyTools.KeyCodeToKeyName(e.KeyValue);
        }

        private void button1_Click(object sender, System.EventArgs e)
        {
            if(KeyID >= 48 && KeyID <= 90 && !HasCtrl){
                MessageBox.Show("不能使用单个字母键或数字键！", "错误", MessageBoxButtons.OK, MessageBoxIcon.Error);
                textBox1.Text = "";
                return;
            }
            if(KeyID == (int)Keys.ControlKey)
            {
                MessageBox.Show("不能使用单个Ctrl！", "错误", MessageBoxButtons.OK, MessageBoxIcon.Error);
                textBox1.Text = "";
                return;
            }
        }
    }
}
