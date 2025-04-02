import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RocketIcon } from "lucide-react";
import { usePoliceSector } from "@/hooks/usePoliceSector";
import { useUsers } from "@/hooks/useUsers";
import { toCapitalize } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

export default function EditUserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    policeSectors,
    loading: sectorsLoading,
    fetchPoliceSectors,
  } = usePoliceSector();
  const { fetchUser, updateUser, loading } = useUsers();
  const [initialData, setInitialData] = useState(null);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "humas",
      policeSectorId: "",
    },
  });

  // Fetch initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Fetch police sectors
        await fetchPoliceSectors();

        // Fetch user data
        const userResponse = await fetchUser(id);
        if (userResponse.success) {
          setInitialData(userResponse.data);
          form.reset({
            ...userResponse.data,
            policeSectorId: userResponse.data.policeSectorId?.toString(),
          });
        }
      } catch (err) {
        console.error("Gagal memuat data:", err);
      }
    };

    loadInitialData();
  }, [id]);

  const handleSubmit = async (data) => {
    try {
      // Hapus password jika tidak diubah
      if (!data.password) {
        delete data.password;
      }

      const payload = {
        ...data,
        policeSectorId: Number(data.policeSectorId),
      };

      const response = await updateUser(id, payload);

      if (response.success) {
        toast.success("User updated successfully");
        navigate("/admin/users");
      }
    } catch (err) {
      toast.error("Failed to update user");
      console.error("Gagal update user:", err);
    }
  };

  if (!initialData) return <div>Memuat data user...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Edit User - {toCapitalize(initialData.name)}
      </h1>

      <Card>
        <CardContent className="p-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        {...field}
                        required
                        minLength={2}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="johndoe@example.com"
                        {...field}
                        required
                        type="email"
                        disabled // Email biasanya tidak bisa diubah
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Password (Biarkan kosong jika tidak diubah)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••"
                        {...field}
                        minLength={6}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      required
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih role user" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="humas">Humas</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="polsek">Polsek</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="policeSectorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sektor Kepolisian</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={sectorsLoading}
                      required
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              sectorsLoading
                                ? "Memuat data sektor..."
                                : "Pilih sektor kepolisian"
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {policeSectors.map((sector) => (
                          <SelectItem
                            key={sector.id}
                            value={sector.id.toString()}
                          >
                            {sector.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={loading || sectorsLoading}
                  className="mt-4"
                >
                  {loading ? "Menyimpan..." : "Simpan Perubahan"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/admin/users")}
                  className="mt-4"
                >
                  Batal
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
