using System.Windows.Forms;

namespace MXAutoTyper
{
    public class KeyTools
    {
        public static string KeyCodeToKeyName(int KeyCode)
        {
            switch (KeyCode) {
                case (int)Keys.A:
                    return "A";
                case (int)Keys.B:
                    return "B";
                case (int)Keys.C:
                    return "C";
                case (int)Keys.D:
                    return "D";
                case (int)Keys.E:
                    return "E";
                case (int)Keys.F:
                    return "F";
                case (int)Keys.G:
                    return "G";
                case (int)Keys.H:
                    return "H";
                case (int)Keys.I:
                    return "I";
                case (int)Keys.J:
                    return "J";
                case (int)Keys.K:
                    return "K";
                case (int)Keys.L:
                    return "L";
                case (int)Keys.M:
                    return "M";
                case (int)Keys.N:
                    return "N";
                case (int)Keys.O:
                    return "O";
                case (int)Keys.P:
                    return "P";
                case (int)Keys.Q:
                    return "Q";
                case (int)Keys.R:
                    return "R";
                case (int)Keys.S:
                    return "S";
                case (int)Keys.T:
                    return "T";
                case (int)Keys.U:
                    return "U";
                case (int)Keys.V:
                    return "V";
                case (int)Keys.W:
                    return "W";
                case (int)Keys.X:
                    return "X";
                case (int)Keys.Y:
                    return "Y";
                case (int)Keys.Z:
                    return "Z";
                case (int)Keys.ControlKey:
                    return "Ctrl";
                case (int)Keys.F1:
                    return "F1";
                case (int)Keys.F2:
                    return "F2";
                case (int)Keys.F3:
                    return "F3";
                case (int)Keys.F4:
                    return "F4";
                case (int)Keys.F5:
                    return "F5";
                case (int)Keys.F6:
                    return "F6";
                case (int)Keys.F7:
                    return "F7";
                case (int)Keys.F8:
                    return "F8";
                case (int)Keys.F9:
                    return "F9";
                case (int)Keys.F10:
                    return "F10";
                case (int)Keys.D0:
                    return "0";
                case (int)Keys.D1:
                    return "1";
                case (int)Keys.D2:
                    return "2";
                case (int)Keys.D3:
                    return "3";
                case (int)Keys.D4:
                    return "4";
                case (int)Keys.D5:
                    return "5";
                case (int)Keys.D6:
                    return "6";
                case (int)Keys.D7:
                    return "7";
                case (int)Keys.D8:
                    return "8";
                case (int)Keys.D9:
                    return "9";
                default:
                    return "";
            }
        }
        public static bool IsKeyLegal(int key)
        {
            return KeyCodeToKeyName(key) != "";
        }
    }
}
