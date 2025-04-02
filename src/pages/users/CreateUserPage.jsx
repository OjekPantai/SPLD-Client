import { useEffect } from "react";
import { useForm } from "react-hook-form";
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
import { useUsers } from "@/hooks/useUsers";
import { Card, CardContent } from "@/components/ui/card";
import { usePoliceSector } from "@/hooks/usePoliceSector";

export default function CreateUserPage() {
  const {
    policeSectors,
    loading: sectorsLoading,
    error: sectorsError,
    fetchPoliceSectors,
  } = usePoliceSector();
  const { loading, createUser } = useUsers();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "humas",
      policeSectorId: "",
    },
  });

  useEffect(() => {
    fetchPoliceSectors();
  }, []);

  const handleSubmit = async (data) => {
    const result = await createUser(data);
    if (result) {
      form.reset();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tambah User Baru</h1>

      {sectorsError && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>
            Gagal memuat data sektor: {sectorsError.message}
          </AlertDescription>
        </Alert>
      )}

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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••"
                        {...field}
                        required
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
                                ? "Memuat data..."
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

              <Button
                type="submit"
                disabled={loading || sectorsLoading}
                className="mt-4"
              >
                {loading ? "Memproses..." : "Tambah User"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
